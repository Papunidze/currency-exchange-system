import Button from '@app-shared/ui/button';
import Input from '@app-shared/ui/input';

export default function Home() {
  return (
    <div style={{ display: 'grid', gap: '5rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
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
          display: 'grid',
          gap: '10px',
          maxWidth: '100%',
          width: '300px',
        }}
      >
        <Input
          label="Name"
          type="name"
          startContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
          }
        />
        <Input label="Email" type="email" endContent={<p>2</p>} />
        <Input label="Password" type="password" />
        <Input label="Number" type="number" />
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
}
