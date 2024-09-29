import { Header } from "./components/Header";
import { InvoiceIndex } from "./components/InvoiceIndex";


export default function Home() {
  return (
    <div className="flex flex-row bg-dark-purple">
        <Header/>
        <InvoiceIndex />
    </div>
  );
}
