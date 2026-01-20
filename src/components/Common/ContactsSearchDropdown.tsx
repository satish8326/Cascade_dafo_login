import React, { useState, useRef, useMemo } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { GetContactsByCustomer } from "../../api/modules/masters/master-service";
import SubtitleText from "./SubtitleText";

export const ContactsSearchDropdown = ({
  selectedContact,
  error = "",
  customerId,
  setError = () => {},
  setSelectedContact = () => {},
}: any) => {
  const latestRequestIdRef = useRef<number>(0);
  const [contactsList, setContactsList] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [contactsLoading, setContactsLoading] = useState<boolean>(false);

  const {
    data: contactsData,
    isPending: isLoading,
    mutate: getContactsByCustomer,
  } = useMutation({
    mutationFn: GetContactsByCustomer,
    onSuccess: (response: any, variables: any) => {
      // Ignore older requests
      if (variables.requestId !== latestRequestIdRef.current) return;

      const newData = response?.data || [];
      const formatted = newData.map((data: any) => ({
        label: `${data?.firstName ?? ""} ${data?.middleName ?? ""} ${
          data?.lastName ?? ""
        }`,
        value: data?.contactId,
      }));
      setContactsLoading(false);
      if (variables.current === 1) {
        setContactsList(formatted);
      } else {
        setContactsList((prevList) => {
          const combinedList = [...prevList, ...formatted];
          const uniqueList = combinedList?.reduce((acc: any[], current) => {
            const isDuplicate = acc?.some(
              (item) => item?.value === current?.value
            );
            if (!isDuplicate) {
              acc?.push(current);
            }
            return acc;
          }, []);
          return uniqueList?.length > 0 ? uniqueList : [];
        });
      }
      setHasMore(newData.length === 20); // If less than pageSize, no more data
    },
    onError: () => setContactsLoading(false),
  });

  // 2. Debounced Fetching
  const fetchContacts = useMemo(
    () =>
      debounce((query: string, currentPage: number) => {
        const requestId = ++latestRequestIdRef.current;
        getContactsByCustomer({
          customerId: customerId,
          pageNumber: currentPage,
          pageSize: 20,
          searchName: query,
          requestId,
        } as any);
      }, 600),
    [getContactsByCustomer]
  );

  // 3. Handle Scrolling (Infinite Scroll)
  const handleScroll = (event: React.SyntheticEvent) => {
    const listboxNode = event.currentTarget;
    if (
      listboxNode.scrollTop + listboxNode.clientHeight >=
      listboxNode.scrollHeight - 1
    ) {
      if (!isLoading && hasMore && inputValue.length >= 3) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchContacts(inputValue, nextPage);
      }
    }
  };

  const getAllContactDetails = (contactVal?: any) => {
    return contactsData?.data && contactsData?.data?.length > 0
      ? contactsData?.data?.find((i: any) => i?.contactId === contactVal?.value)
      : null;
  };

  return (
    <>
      <Autocomplete
        options={contactsList}
        open={isFocused && inputValue.length >= 3}
        onOpen={() => setIsFocused(true)}
        onClose={() => setIsFocused(false)}
        loading={isLoading || contactsLoading}
        filterOptions={(x) => x}
        onChange={(_, newValue) => {
          setSelectedContact(getAllContactDetails(newValue));
          setError("");
        }}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
          setError("");
          if (newInputValue.length >= 3) {
            setContactsLoading(true);
            setPage(1);
            fetchContacts(newInputValue, 1);
          } else {
            setContactsList([]);
          }
        }}
        // Use ListboxProps to catch the scroll event
        ListboxProps={{
          onScroll: handleScroll,
          style: { maxHeight: "300px" },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              inputValue && inputValue?.length >= 3
                ? "Name"
                : "Enter 3+ letters to search"
            }
            placeholder="Enter 3+ letters to search"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            error={Boolean(error && !selectedContact)}
            helperText={error && !selectedContact ? error : ""}
          />
        )}
        // Custom "No Options" behavior to match your loading text
        noOptionsText={
          isLoading || contactsLoading
            ? "Loading contacts ... "
            : inputValue && inputValue?.length < 3
            ? "Enter 3+ letters to search"
            : "No Records Found"
        }
      />
      {selectedContact && (
        <SubtitleText
          subtitleText={
            selectedContact?.email
              ? `Your registered email: ${selectedContact?.email}`
              : ""
          }
          sx={{ mt: 1, fontSize: "16px", color: "#929292", fontWeight: 400 }}
        />
      )}
    </>
  );
};
