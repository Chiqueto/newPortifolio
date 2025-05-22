import { DiReact } from "react-icons/di";
import { Card } from "./ui/card";

const SkillsCard = () => {
    return (
        <div className="flex flex-col gap-1 text-center">
            <Card className="p-2 text-center mx-auto">
                <DiReact
                    size={40}
                    className="text-cyan-500 hover:text-zinc-50 transition-transform transform duration-300 ease-in-out" />
            </Card><h4 className="font-mono text-base font-medium">React</h4>
        </div>
    )

}

export default SkillsCard;