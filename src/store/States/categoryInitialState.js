import {StatusesColors} from "../../Variables";

export const initialState = [
  {
    status: "queue",
    icon: "⭕️",
    color: StatusesColors.Queue
  }, {
    status: "development",
    icon: "🔆️",
    color: StatusesColors.Development
  }, {
    status: "done",
    icon: "✅",
    color: StatusesColors.Done
  }
]