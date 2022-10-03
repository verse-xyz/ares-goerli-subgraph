import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { HyperimageDeployed } from "../generated/schema"
import { HyperimageDeployed as HyperimageDeployedEvent } from "../generated/Factory/Factory"
import { handleHyperimageDeployed } from "../src/factory"
import { createHyperimageDeployedEvent } from "./factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let image = Address.fromString("0x0000000000000000000000000000000000000001")
    let newHyperimageDeployedEvent = createHyperimageDeployedEvent(token, image)
    handleHyperimageDeployed(newHyperimageDeployedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("HyperimageDeployed created and stored", () => {
    assert.entityCount("HyperimageDeployed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "HyperimageDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "HyperimageDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "image",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
