import MyButton from "./script/myButton";

const PluginManager = window.PluginManager;

PluginManager.register("MyButton", MyButton, ".btn-buy", {});
