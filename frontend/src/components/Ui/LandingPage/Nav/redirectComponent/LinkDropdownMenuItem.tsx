import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { DropdownMenuItem } from "@/components/Ui/Menu/dropdown-menu";

interface LinkDropdownMenuItemProps extends LinkProps {
    className?: string;
    children: React.ReactNode;
}

const LinkDropdownMenuItem: React.FC<LinkDropdownMenuItemProps> = ({ className, children, ...props }) => {
    return (
        <DropdownMenuItem className={className}>
            <Link {...props} className="w-full h-full flex items-center">
                {children}
            </Link>
        </DropdownMenuItem>
    );
};

export default LinkDropdownMenuItem;
