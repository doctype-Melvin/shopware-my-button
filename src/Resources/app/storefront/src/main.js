import MyButton from "./script/myButton";

const PluginManager = window.PluginManager;

PluginManager.override("AddToCart", MyButton, "[data-add-to-cart]", {});
