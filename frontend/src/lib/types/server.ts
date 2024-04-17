import type { tTranscript, tVariableType, tLink } from "."

export type tServerData = {
    interviews: tTranscript[]
    driver_nodes: tVariableType
    pressure_nodes: tVariableType
    state_nodes: tVariableType
    impact_nodes: tVariableType
    response_nodes: tVariableType
    links: tLink[]
    driver_types:any
    pressure_types:any
    state_types:any
    impact_types:any
    response_types:any
}