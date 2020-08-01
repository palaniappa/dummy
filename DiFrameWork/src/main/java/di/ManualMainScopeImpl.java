package di;

public class ManualMainScopeImpl extends MainScope {

    private DashboardController dashboardController;
    private NetworkClient networkClient;

    @Override
    DashboardController getDashboardController() {
        return dashboardController();
    }

    private DashboardController dashboardController() {
        if(this.dashboardController == null ){
            this.dashboardController = createDashboardController(networkClient());
        }
        return this.dashboardController;
    }

    private  NetworkClient networkClient() {
        if(this.networkClient == null){
            this.networkClient = createNetworkClient();
        }
        return this.networkClient;
    }
}
