import Button from "shared/ui/button/button";

export default function Home() {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button>Primary</Button>
      <Button variant="btn-danger">Primary</Button>
      <Button variant="btn-loading">Primary</Button>
      <Button variant="btn-outlined">Primary</Button>
      <Button variant="btn-secondary">Primary</Button>
      <Button variant="btn-success">Primary</Button>
      <Button variant="btn-warning">Primary</Button>
    </div>
  );
}
