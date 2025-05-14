import { ModeToggle } from "./mode-toggle";

const Header = () => {
    return (
        <div className="flex flex-row justify-between items-center fixed top-0 left-0 right-0 bg-background p-4 z-10">
            <h1 className="font-head text-primary text-xl">Portifólio</h1>
            <ModeToggle />

        </div>);
}

export default Header;