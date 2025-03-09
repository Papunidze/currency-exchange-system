import React from 'react';
import styles from './signin.modules.scss';
import Image from '@app-shared/components/Image';

const SignIn = () => {
  return (
    <div>
      <Image imageKey="social:facebook" />
      <Image imageKey="social:google" size={32} />
      <Image imageKey="logo:default" className="header-logo" />
      <Image imageKey="logo:light" />
      <Image imageKey="banner:hero" objectFit="cover" />
      <Image imageKey="banner:auth" objectFit="cover" />
      <Image imageKey="banner:welcome" objectFit="cover" />

      <Image imageKey="avatar:user" size={48} />
      <Image imageKey="icon:menu" onClick={() => console.log('clicked')} />
    </div>
  );
};

export default SignIn;
