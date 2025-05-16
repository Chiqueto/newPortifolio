import Home from "./main-content/home";
import { Card } from "./ui/card";

const MainContent = () => {
    return (
        <main className="max-w-sm w-full md:max-w-[100%] md:mt-20">
            <Card className="px-4">
                <Home />
            </Card>

        </main>);
}

export default MainContent;