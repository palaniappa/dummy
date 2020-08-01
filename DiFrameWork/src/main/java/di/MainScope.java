package di;

@Scope
public abstract class MainScope {

    // Access Methods
    abstract  DashboardController getDashboardController();

    //Factory Methods
    DashboardController createDashboardController(NetworkClient networkClient){
        return new DashboardController(new NetworkClient());
    }

    NetworkClient createNetworkClient(){
        return new NetworkClient();
    }
}
