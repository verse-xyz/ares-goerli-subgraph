import { Factory, Token } from '../../generated/schema'
import { Token as TokenTemplate } from '../../generated/templates'
import { Token as TokenContract } from '../../generated/templates/Token/Token'
import { Image as ImageContract } from '../../generated/templates/Token/Image'

import { HyperimageDeployed } from '../../generated/Factory/Factory'
import { FACTORY_ADDRESS } from './helpers'

export function handleHyperimageDeployed(event: HyperimageDeployed): void {
  // load factory (create if first exchange on factory)
  let factory = Factory.load(FACTORY_ADDRESS);
  if (factory === null) {
    factory = new Factory(FACTORY_ADDRESS);
  }
  factory.save();

  // create new token instance
  let token = new Token(event.params.token.toHexString()) as Token;
  token.image = event.params.image;
  let tokenContract = TokenContract.bind(event.params.token);
  let name = tokenContract.name();
  token.name = name;
  let creator = tokenContract.getCreator();
  token.creator = creator;
  token.circulatingSupply = tokenContract.getSupply();

  // create the tracked contract based on the template
  TokenTemplate.create(event.params.token);

  // save updated values
  token.save();
  factory.save();
}