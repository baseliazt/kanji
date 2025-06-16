import { ExercisesContainer } from "@/pwa/features/exercise/container";
import { ExercisesProvider } from "@/pwa/features/exercise/context";

export default function ExercisesPage() {
  return (
    <ExercisesProvider>
      <ExercisesContainer />
    </ExercisesProvider>
  );
}
