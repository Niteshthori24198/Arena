import MainConfig from "./config/main.config";

class Main {
    public static main(): void {
        MainConfig.getController().start();
    }
}

Main.main();