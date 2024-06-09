import MainModel from "@/components/models/mainModel";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="h-100">
      <MainModel/>
    </div>
  )
}