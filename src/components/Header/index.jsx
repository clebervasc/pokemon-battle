import React from 'react';
import _ from 'lodash';
import { HeaderContainer, HeaderButton } from './style';

import logo from '../../images/logo.png';
import icon from '../../images/pokeball-icon.svg';

export function Header({ logger }) {
  return (
    <HeaderContainer logger={logger}>
      <img src={logo} alt="Pokémon" />
      {_.some(logger) && <div>{logger}</div>}
      {_.some(logger) && (
        <HeaderButton onClick={() => window.location.reload()}>
          <img src={icon} alt="" />
          Reiniciar partida
        </HeaderButton>
      )}
    </HeaderContainer>
  );
}
