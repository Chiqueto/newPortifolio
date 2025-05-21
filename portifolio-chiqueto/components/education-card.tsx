import { Card } from "./ui/card";

interface EducationCardProps {
    duration: string;
    formation: string;
    institution: string;
}


const EducationCard = ({formation, institution, duration}: EducationCardProps) => {
    return (
        <Card className="p-2">
            <p>
                {duration}<br />
                <strong>{formation}</strong><br />
                {institution}
            </p>
        </Card>
    )
}

export default EducationCard;