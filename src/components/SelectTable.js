import React, { useState, useEffect } from "react";
import SearchBar from "./Searchbar";
import Filter from "./Filter";
import SortTable from "./SortTable";

const SelectTable = ({
    id = "selectTable",
    columns = [],
    data = [],
    multiSelect = true,
    onSelectionChange,
}) => {
    const [filteredData, setFilteredData] = useState(data);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedRows, setSelectedRows] = useState([]);

    // Sorting function
    const handleSorting = (column, order) => {
        setSortColumn(column);
        setSortOrder(order);
    };

    // Apply sorting whenever sort state changes
    useEffect(() => {
        if (!sortColumn) return;

        const sortedData = [...filteredData].sort((a, b) => {
            let valueA = a[sortColumn] ?? "";
            let valueB = b[sortColumn] ?? "";

            if (typeof valueA === "string" && typeof valueB === "string") {
                return sortOrder === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            if (typeof valueA === "number" && typeof valueB === "number") {
                return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
            }

            if (Date.parse(valueA) && Date.parse(valueB)) {
                return sortOrder === "asc"
                    ? new Date(valueA) - new Date(valueB)
                    : new Date(valueB) - new Date(valueA);
            }

            return 0;
        });

        setFilteredData(sortedData);
    }, [sortColumn, sortOrder]);

    // Handle row selection
    const handleRowSelect = (row) => {
        let newSelectedRows;

        if (multiSelect) {
            // Toggle selection for multiSelect mode
            newSelectedRows = selectedRows.some((selected) => selected.id === row.id)
                ? selectedRows.filter((selected) => selected.id !== row.id)
                : [...selectedRows, row];
        } else {
            // Single selection mode
            newSelectedRows = [row];
        }

        setSelectedRows(newSelectedRows);
        onSelectionChange && onSelectionChange(newSelectedRows);
    };

    return (
        <div>
            <div className="d-flex gap-2 align-items-center mb-3">
                {/* Search Bar */}
                <SearchBar tableId={id} placeholder="Search..." />

                {/* Filter Component */}
                <Filter columns={columns} data={data} onFilter={setFilteredData} />

                {/* Sorting Component */}
                <SortTable
                    data={filteredData}
                    setSortedData={setFilteredData}
                    columns={columns}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />
            </div>

            {/* Table Component */}
            <div className="table-container">
                <table className="table ae-table" id={id}>
                    <thead>
                        <tr>
                            <th>Select</th>
                            {columns.map((column) => (
                                <th key={column.dbcol} onClick={() => handleSorting(column.dbcol, sortOrder)}>
                                    {column.headname} {sortColumn === column.dbcol && (sortOrder === "asc" ? "▲" : "▼")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((row) => (
                                <tr key={row.id}>
                                    <td>
                                        <input
                                            type={multiSelect ? "checkbox" : "radio"}
                                            name="selection"
                                            checked={selectedRows.some((selected) => selected.id === row.id)}
                                            onChange={() => handleRowSelect(row)}
                                        />
                                    </td>
                                    {columns.map((column) => (
                                        <td key={column.dbcol}>{row[column.dbcol]}</td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1}>No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectTable;
