import React from "react";
import { Link } from "@inertiajs/react";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}


interface Meta {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: PaginationLink[];
}

interface CustomPaginationProps {
    meta: Meta;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ meta }) => {
    const { from, to, total, links } = meta;

    return (
        <div className="flex flex-col md:flex-row justify-between items-center text-xs mb-10 mt-10 gap-3">
            {/* Showing X to Y of Z results */}
            <div className="text-gray-600">
                Showing {from} to {to} of {total} results
            </div>

            {/* Pagination Links */}
            <div className="flex justify-center space-x-2">
                {links?.map((link, index) =>
                    link.url ? (
                        <Link
                            key={index}
                            only={['soloParentList']}
                            href={link.url}
                            className={`px-3 py-1 border rounded ${link.active ? "bg-green-700 text-white" : ""}`}
                        >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Link>
                    ) : (
                        <span
                            key={index}
                            className="px-3 py-1 border rounded text-gray-400"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default CustomPagination;
