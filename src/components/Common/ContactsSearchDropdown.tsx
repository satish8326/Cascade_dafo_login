import React, { useState, useRef, useMemo } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { GetPractitionersDropdownList } from "../../api/modules/masters/master-service";

export const ContactsSearchDropdown = ({
  includeActiveInactive = false,
  setError = () => {},
  setSelectedContact = () => {},
}: any) => {
  const latestRequestIdRef = useRef<number>(0);
  const [contactsList, setContactsList] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { isPending: isLoading, mutate: getPractitioners } = useMutation({
    mutationFn: GetPractitionersDropdownList,
    onSuccess: (response: any, variables: any) => {
      // Ignore older requests
      if (variables.requestId !== latestRequestIdRef.current) return;

      const newData = response?.data?.data || [];
      const formatted = newData.map((data: any) => ({
        label: `${data.firstName} ${data.lastName}${
          data.customerName ? ` [${data.customerName}]` : ""
        }`,
        value: data.id,
      }));

      if (variables.current === 1) {
        setContactsList(formatted);
      } else {
        setContactsList((prev) => [...prev, ...formatted]);
      }

      setHasMore(newData.length === 20); // If less than pageSize, no more data
    },
  });

  // 2. Debounced Fetching
  const fetchContacts = useMemo(
    () =>
      debounce((query: string, currentPage: number) => {
        const requestId = ++latestRequestIdRef.current;
        getPractitioners({
          contactType: 5,
          current: currentPage,
          pageSize: 20,
          contactName: query,
          requestId,
          contactStatus: includeActiveInactive ? undefined : "active",
        } as any);
      }, 600),
    [getPractitioners]
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

  return (
    <Autocomplete
      options={contactsList}
      loading={isLoading}
      filterOptions={(x) => x}
      onChange={(_, newValue) => {
        setSelectedContact(newValue);
        setError("");
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
        if (newInputValue.length >= 3) {
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
          label="Enter 3+ letters to search"
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
        />
      )}
      // Custom "No Options" behavior to match your loading text
      noOptionsText={
        inputValue && inputValue?.length < 3
          ? "Enter 3+ letters to search"
          : "No Records Found"
      }
    />
  );
};
