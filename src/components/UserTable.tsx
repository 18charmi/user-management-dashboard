import type { User } from "../types";
import Table, { type Column } from "../ui/Table"

const columns: Column<User>[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Company", accessor: (row) => row.company.name },
];

function UserTable({ list, loading }: { list: User[], loading: boolean }) {

    return (
        <Table
            loading={loading}
            data={list}
            columns={columns}
            keyExtractor={(row) => row.id}
            emptyMessage="No users found."
        />)
}

export default UserTable
