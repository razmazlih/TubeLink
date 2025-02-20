interface LayoutProps {
    children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex w-full justify-center h-screen items-center">
            {children}
        </div>
    );
};

export default layout;
