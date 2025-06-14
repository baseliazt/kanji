import { TipsContainer } from "@/pwa/features/tips/container";
import { TipsProvider } from "@/pwa/features/tips/context";

export default function Home() {
  return (
    <TipsProvider>
      <TipsContainer />
    </TipsProvider>
  );
}
