import LeftBar from '@app-shared/components/left-bar';
import TopBar from '@app-shared/components/top-bar';
import styles from './page.module.scss';
import IconButton from '@app-shared/ui/iconButton';
import Input from '@app-shared/ui/input';
import { userSchema } from '@app-shared/schema';

export default function Home() {
  return (
    <div className={styles.container}>
      <IconButton icon={<p>I</p>} />
      <Input label="enter" />
    </div>
  );
}
