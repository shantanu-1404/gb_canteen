import React, { useState, useEffect } from "react";
import SearchBar from "./Searchbar";
import Filter from "./Filter";
import SortTable from "./SortTable";
import { Row, Col } from "react-bootstrap";

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

    // Handle search query
    const handleSearch = (query) => {
        const searchedData = data.filter((item) =>
            Object.values(item).some((value) =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredData(searchedData);
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

    // ✅ Handle row selection when clicking the row
    const handleRowSelect = (row) => {
        let newSelectedRows;

        if (multiSelect) {
            // Toggle selection for multiSelect mode
            newSelectedRows = selectedRows.some((selected) => selected.id === row.id)
                ? selectedRows.filter((selected) => selected.id !== row.id)
                : [...selectedRows, row];
        } else {
            // Single selection mode - select row when clicked, remove previous selection
            newSelectedRows = selectedRows[0]?.id === row.id ? [] : [row];
        }

        setSelectedRows(newSelectedRows);
        onSelectionChange && onSelectionChange(newSelectedRows);
    };

    return (
        <div>
            <Row className="gap-2 align-items-center mb-3">
                <Col>
                    <SearchBar
                        tableId={id}
                        gridviewId={id}
                        placeholder="Search for data..."
                        onSearch={(query) => handleSearch(query)}
                    />
                </Col>

                <Col className="col-auto">
                    <div className="d-flex gap-2">
                        <Filter
                            columns={columns}
                            data={data}
                            onFilter={setFilteredData}
                            tableId={id}
                        />
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
                </Col>
            </Row>

            {/* Table Component */}
            <div className="table-container">
                <table className="table ae-table" id={id}>
                    <thead>
                        <tr>
                            {multiSelect && <th>Select</th>}
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
                                <tr
                                    key={row.id}
                                    onClick={() => handleRowSelect(row)}
                                    className={selectedRows.some((selected) => selected.id === row.id) ? "selected-row" : ""}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    {multiSelect && (
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.some((selected) => selected.id === row.id)}
                                                onChange={() => handleRowSelect(row)}
                                            />
                                        </td>
                                    )}
                                    {columns.map((column) => (
                                        <td key={column.dbcol}>{row[column.dbcol]}</td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (multiSelect ? 1 : 0)}>No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectTable;
