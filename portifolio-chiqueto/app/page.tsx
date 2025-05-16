import Header from "@/components/header";
import Navbar from "@/components/navbar";
import Presentation from "@/components/presentation";


export default function Home() {
  return (
    <div className="">
      <Header />
      <div className="mx-4 md:mt-24 flex flex-col gap-4" >
        <Presentation />
        <Navbar />
      </div>

    </div>
  );
}
