// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export interface ITelegramUser {
//   id: number;
//   first_name: string;
//   last_name: string;
//   username: string;
//   language_code: string;
// }

// export interface IWebApp {
//   initData: string;
//   initDataUnsafe: {
//     query_id: string;
//     user: ITelegramUser;
//     auth_date: string;
//     hash: string;
//     start_param: string;
//   };
//   version: string;
//   platform: string;
//   colorScheme: string;
//   themeParams: {
//     link_color: string;
//     button_color: string;
//     button_text_color: string;
//     secondary_bg_color: string;
//     hint_color: string;
//     bg_color: string;
//     text_color: string;
//   };
//   isExpanded: boolean;
//   viewportHeight: number;
//   viewportStableHeight: number;
//   isClosingConfirmationEnabled: boolean;
//   headerColor: string;
//   backgroundColor: string;
//   BackButton: {
//     isVisible: boolean;
//   };
//   MainButton: {
//     text: string;
//     color: string;
//     textColor: string;
//     isVisible: boolean;
//     isProgressVisible: boolean;
//     isActive: boolean;
//   };
//   HapticFeedback: any;
//   ready: () => void;
// }

// export interface Favorite {
//   userId?: string;
//   favId: string;
//   favName: string;
//   favImage: string;
// }

// export interface Telegram {
//   userRes?: any | null;
//   user?: ITelegramUser;
//   webApp?: IWebApp;
//   startParam?: null | string;
// }

// const initialState: Telegram = {
//   userRes: null,
// };

// const TelegramSlice = createSlice({
//   name: "telegramUser",
//   initialState,
//   reducers: {
//     setTelegram(_state, action: PayloadAction<Telegram>) {
//       if (action.payload.user) _state.user = action.payload.user;
//       if (action.payload.webApp) _state.webApp = action.payload.webApp;
//       if (action.payload.userRes) {
//         _state.userRes = action.payload.userRes;
//       }
//       if (action.payload.startParam)
//         _state.startParam = action.payload.startParam;
//     },
//   },
// });

// export const { setTelegram } = TelegramSlice.actions;
// export default TelegramSlice.reducer;
