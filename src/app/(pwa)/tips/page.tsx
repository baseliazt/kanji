import { TipsContainer } from "@/pwa/features/tips/container";
import { TipsProvider } from "@/pwa/features/tips/context";

export default function TipsPage() {
  return (
    <TipsProvider>
      <TipsContainer />
    </TipsProvider>
  );
}
