import React from 'react';
import expect, { createSpy, restoreSpies } from 'expect';
import { mount } from 'enzyme';
import { noop } from 'lodash';

import { hostStub } from 'test/stubs';
import HostDetails from 'components/hosts/HostDetails';

describe('HostDetails - component', () => {
  afterEach(restoreSpies);

  it('calls the onDestroyHost prop when the action button is clicked on an offline host', () => {
    const destroySpy = createSpy();
    const querySpy = createSpy();
    const offlineHost = { ...hostStub, status: 'offline' };

    const offlineComponent = mount(
      <HostDetails
        host={offlineHost}
        onDestroyHost={destroySpy}
        onQueryHost={querySpy}
        isLoading={false}
      />,
    );
    const btn = offlineComponent.find('Button');

    expect(btn.find('Icon').prop('name')).toEqual('trash');

    btn.simulate('click');

    expect(destroySpy).toHaveBeenCalled();
    expect(querySpy).toNotHaveBeenCalled();
  });

  it('calls the onDestroyHost prop when the action button is clicked on a mia host', () => {
    const destroySpy = createSpy();
    const querySpy = createSpy();
    const miaHost = { ...hostStub, status: 'mia' };

    const miaComponent = mount(
      <HostDetails
        host={miaHost}
        onDestroyHost={destroySpy}
        onQueryHost={querySpy}
        isLoading={false}
      />,
    );
    const btn = miaComponent.find('Button');

    expect(btn.find('Icon').prop('name')).toEqual('trash');

    btn.simulate('click');

    expect(destroySpy).toHaveBeenCalled();
    expect(querySpy).toNotHaveBeenCalled();
  });

  it('calls the onQueryHost prop when the action button is clicked on an online host', () => {
    const destroySpy = createSpy();
    const querySpy = createSpy();
    const onlineHost = { ...hostStub, status: 'online' };

    const onlineComponent = mount(
      <HostDetails
        host={onlineHost}
        onDestroyHost={destroySpy}
        onQueryHost={querySpy}
        isLoading={false}
      />,
    );
    const btn = onlineComponent.find('Button');

    expect(btn.find('Icon').prop('name')).toEqual('query');

    btn.simulate('click');

    expect(destroySpy).toNotHaveBeenCalled();
    expect(querySpy).toHaveBeenCalled();
  });

  it('renders a spinner while hosts details are loaded', () => {
    const loadingComponent = mount(
      <HostDetails
        host={{ ...hostStub }}
        onDestroyHost={noop}
        onQueryHost={noop}
        isLoading
      />,
    );

    expect(loadingComponent.find('Circle').length).toEqual(1);
    expect(loadingComponent.find('.host-details__details-list').length).toEqual(0);
  });
});

