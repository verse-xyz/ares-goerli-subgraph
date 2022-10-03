import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { HyperimageDeployed, Initialized } from "../generated/Factory/Factory"

export function createHyperimageDeployedEvent(
  token: Address,
  image: Address
): HyperimageDeployed {
  let hyperimageDeployedEvent = changetype<HyperimageDeployed>(newMockEvent())

  hyperimageDeployedEvent.parameters = new Array()

  hyperimageDeployedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  hyperimageDeployedEvent.parameters.push(
    new ethereum.EventParam("image", ethereum.Value.fromAddress(image))
  )

  return hyperimageDeployedEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}
