import React, { useState, useRef, useCallback } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { GetContactsByCustomer } from "../../api/modules/masters/master-service";
import SubtitleText from "./SubtitleText";
import { useMediaQuery, useTheme } from "@mui/material";

export const ContactsSearchDropdown = ({
  selectedContact,
  error = "",
  customerId,
  setError = () => {},
  setSelectedContact = () => {},
}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

      const newData = response || [];
      const formatted = newData.map((data: any) => ({
        label: `${data?.firstName ?? ""} ${data?.middleName ?? ""} ${
          data?.lastName ?? ""
        }`,
        value: data?.contactId,
      }));
      setContactsLoading(false);
      if (variables.pageNumber === 1) {
        setContactsList(formatted);
      } else {
        setContactsList((prevList) => {
          const combinedList = [...prevList, ...formatted];
          const uniqueList = combinedList?.reduce((acc: any[], current) => {
            const isDuplicate = acc?.some(
              (item) => item?.value === current?.value,
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
  const fetchContacts = useCallback(
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
    [getContactsByCustomer],
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
    return contactsData && contactsData?.length > 0
      ? contactsData?.find((i: any) => i?.contactId === contactVal?.value)
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
        sx={{
          "& .MuiInputLabel-root": {
            fontSize: isMobile ? "12px" : "15px",
          },
          "& .MuiInputBase-root": {
            height: isMobile ? 44 : 52,
            fontSize: isMobile ? "12px" : "16px",
            paddingRight: "8px !important",
          },
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
          style: {
            maxHeight: isMobile ? "200px" : "300px",
            fontSize: isMobile ? "14px" : "16px",
          },
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
                  {isLoading || contactsLoading ? (
                    <CircularProgress
                      color="inherit"
                      size={isMobile ? 16 : 20}
                    />
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
          sx={{
            mt: 1,
            fontSize: isMobile ? "12px" : "16px",
            color: "#929292",
            fontWeight: 400,
          }}
        />
      )}
    </>
  );
};
