import { DiReact } from "react-icons/di";
import { Card } from "../ui/card";
// import { FaReact } from "react-icons/fa6";

const Skills = () => {
    return (
        <section className="text-left ">
            <h2 className="font-body font-bold text-xl">Skills</h2>
            <div>
                <div><Card><DiReact
                    size={40}
                    className="text-cyan-500 hover:text-zinc-50 transition-transform transform duration-300 ease-in-out"
                /></Card><h4>React</h4></div>
            </div>
        </section>
    )
}

export default Skills;