import Button from "ui/button";
import Input from "ui/input";

export default function Home() {
  return (
    <div style={{ display: "grid", gap: "5rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button>Primary</Button>
        <Button variant="btn-danger">Primary</Button>
        <Button variant="btn-loading">Primary</Button>
        <Button variant="btn-outlined">Primary</Button>
        <Button variant="btn-secondary">Primary</Button>
        <Button variant="btn-success">Primary</Button>
        <Button variant="btn-warning">Primary</Button>
      </div>
      <div
        style={{
          display: "grid",
          gap: "10px",
          maxWidth: "100%",
          width: "300px",
        }}
      >
        <Input label="Name" type="name" placeholder="name" />
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        <Input label="Number" type="number" />
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
}
