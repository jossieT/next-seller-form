//import Image from "next/image";
import NotFromBot from "./telegram/NotFromBot";
import BackButton from "./telegram/BackButton";
import CreateProduct from "./CreateProduct";
export default function Home() {
  return (
    <div>
      <NotFromBot />
      <CreateProduct />
      <BackButton />
    </div>
  );
}
