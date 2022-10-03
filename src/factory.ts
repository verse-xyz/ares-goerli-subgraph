import {
  HyperimageDeployed as HyperimageDeployedEvent,
  Initialized as InitializedEvent
} from "../generated/Factory/Factory"
import { HyperimageDeployed, Initialized } from "../generated/schema"

export function handleHyperimageDeployed(event: HyperimageDeployedEvent): void {
  let entity = new HyperimageDeployed(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.token = event.params.token
  entity.image = event.params.image
  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.version = event.params.version
  entity.save()
}
