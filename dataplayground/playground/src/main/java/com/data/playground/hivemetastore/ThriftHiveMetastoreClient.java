package com.data.playground.hivemetastore;

import com.google.common.collect.ImmutableList;
import com.google.common.net.HostAndPort;
import org.apache.hadoop.hive.metastore.api.*;
import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;

import javax.net.ssl.SSLContext;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.net.Proxy.Type.SOCKS;
import static java.util.Objects.requireNonNull;

public class ThriftHiveMetastoreClient {

    private final TTransport transport;
    private final ThriftHiveMetastore.Client client;

    public ThriftHiveMetastoreClient(HostAndPort hostAndPort) throws TTransportException {
        Optional<SSLContext> sslContext = Optional.empty();
        Optional<HostAndPort> socksProxy = Optional.ofNullable(null);

        this.transport = ThriftHiveMetastoreClient.createRaw(hostAndPort, sslContext, socksProxy, 10000);
        this.client = new ThriftHiveMetastore.Client(new TBinaryProtocol(transport));
    }

    private static TTransport createRaw(HostAndPort address, Optional<SSLContext> sslContext, Optional<HostAndPort> socksProxy, int timeoutMillis)
            throws TTransportException
    {
        Proxy proxy = socksProxy
                .map(socksAddress -> new Proxy(SOCKS, InetSocketAddress.createUnresolved(socksAddress.getHost(), socksAddress.getPort())))
                .orElse(Proxy.NO_PROXY);

        Socket socket = new Socket(proxy);
        try {
            socket.connect(new InetSocketAddress(address.getHost(), address.getPort()), timeoutMillis);
            socket.setSoTimeout(timeoutMillis);

            if (sslContext.isPresent()) {
                // SSL will connect to the SOCKS address when present
                HostAndPort sslConnectAddress = socksProxy.orElse(address);

                socket = sslContext.get().getSocketFactory().createSocket(socket, sslConnectAddress.getHost(), sslConnectAddress.getPort(), true);
            }
            return new TSocket(socket);
        }
        catch (Throwable t) {
            // something went wrong, close the socket and rethrow
            try {
                socket.close();
            }
            catch (IOException e) {
                t.addSuppressed(e);
            }
            throw new TTransportException(t);
        }
    }

    public void close()
    {
        transport.close();
    }

    
    public List<String> getAllDatabases()
            throws TException
    {
        return client.get_all_databases();
    }

    
    public Database getDatabase(String dbName)
            throws TException
    {
        return client.get_database(dbName);
    }

    
    public List<String> getAllTables(String databaseName)
            throws TException
    {
        return client.get_all_tables(databaseName);
    }

    
    public List<String> getTableNamesByFilter(String databaseName, String filter)
            throws TException
    {
        return client.get_table_names_by_filter(databaseName, filter, (short) -1);
    }

    
    public void createDatabase(Database database)
            throws TException
    {
        client.create_database(database);
    }

    
    public void dropDatabase(String databaseName, boolean deleteData, boolean cascade)
            throws TException
    {
        client.drop_database(databaseName, deleteData, cascade);
    }

    
    public void alterDatabase(String databaseName, Database database)
            throws TException
    {
        client.alter_database(databaseName, database);
    }

    
    public void createTable(Table table)
            throws TException
    {
        client.create_table(table);
    }

    
    public void dropTable(String databaseName, String name, boolean deleteData)
            throws TException
    {
        client.drop_table(databaseName, name, deleteData);
    }

    
    public void alterTable(String databaseName, String tableName, Table newTable)
            throws TException
    {
        client.alter_table(databaseName, tableName, newTable);
    }

    
    public Table getTable(String databaseName, String tableName)
            throws TException
    {
        return client.get_table(databaseName, tableName);
    }

    
    public List<FieldSchema> getFields(String databaseName, String tableName)
            throws TException
    {
        return client.get_fields(databaseName, tableName);
    }

    
    public List<ColumnStatisticsObj> getTableColumnStatistics(String databaseName, String tableName, List<String> columnNames)
            throws TException
    {
        TableStatsRequest tableStatsRequest = new TableStatsRequest(databaseName, tableName, columnNames);
        return client.get_table_statistics_req(tableStatsRequest).getTableStats();
    }

    
    public void setTableColumnStatistics(String databaseName, String tableName, List<ColumnStatisticsObj> statistics)
            throws TException
    {
        ColumnStatisticsDesc statisticsDescription = new ColumnStatisticsDesc(true, databaseName, tableName);
        ColumnStatistics request = new ColumnStatistics(statisticsDescription, statistics);
        client.update_table_column_statistics(request);
    }

    
    public void deleteTableColumnStatistics(String databaseName, String tableName, String columnName)
            throws TException
    {
        client.delete_table_column_statistics(databaseName, tableName, columnName);
    }

    
    public Map<String, List<ColumnStatisticsObj>> getPartitionColumnStatistics(String databaseName, String tableName, List<String> partitionNames, List<String> columnNames)
            throws TException
    {
        PartitionsStatsRequest partitionsStatsRequest = new PartitionsStatsRequest(databaseName, tableName, columnNames, partitionNames);
        return client.get_partitions_statistics_req(partitionsStatsRequest).getPartStats();
    }

    
    public void setPartitionColumnStatistics(String databaseName, String tableName, String partitionName, List<ColumnStatisticsObj> statistics)
            throws TException
    {
        ColumnStatisticsDesc statisticsDescription = new ColumnStatisticsDesc(false, databaseName, tableName);
        statisticsDescription.setPartName(partitionName);
        ColumnStatistics request = new ColumnStatistics(statisticsDescription, statistics);
        client.update_partition_column_statistics(request);
    }

    
    public void deletePartitionColumnStatistics(String databaseName, String tableName, String partitionName, String columnName)
            throws TException
    {
        client.delete_partition_column_statistics(databaseName, tableName, partitionName, columnName);
    }

    
    public List<String> getPartitionNames(String databaseName, String tableName)
            throws TException
    {
        return client.get_partition_names(databaseName, tableName, (short) -1);
    }

    
    public List<String> getPartitionNamesFiltered(String databaseName, String tableName, List<String> partitionValues)
            throws TException
    {
        return client.get_partition_names_ps(databaseName, tableName, partitionValues, (short) -1);
    }

    
    public int addPartitions(List<Partition> newPartitions)
            throws TException
    {
        return client.add_partitions(newPartitions);
    }

    
    public boolean dropPartition(String databaseName, String tableName, List<String> partitionValues, boolean deleteData)
            throws TException
    {
        return client.drop_partition(databaseName, tableName, partitionValues, deleteData);
    }

    
    public void alterPartition(String databaseName, String tableName, Partition partition)
            throws TException
    {
        client.alter_partition(databaseName, tableName, partition);
    }

    
    public Partition getPartition(String databaseName, String tableName, List<String> partitionValues)
            throws TException
    {
        return client.get_partition(databaseName, tableName, partitionValues);
    }

    
    public List<Partition> getPartitionsByNames(String databaseName, String tableName, List<String> partitionNames)
            throws TException
    {
        return client.get_partitions_by_names(databaseName, tableName, partitionNames);
    }

    
    public List<Role> listRoles(String principalName, PrincipalType principalType)
            throws TException
    {
        return client.list_roles(principalName, principalType);
    }

    
    public List<HiveObjectPrivilege> listPrivileges(String principalName, PrincipalType principalType, HiveObjectRef hiveObjectRef)
            throws TException
    {
        return client.list_privileges(principalName, principalType, hiveObjectRef);
    }

    
    public List<String> getRoleNames()
            throws TException
    {
        return client.get_role_names();
    }

    
    public void createRole(String roleName, String grantor)
            throws TException
    {
        Role role = new Role(roleName, 0, grantor);
        client.create_role(role);
    }

    
    public void dropRole(String role)
            throws TException
    {
        client.drop_role(role);
    }

    
    public boolean grantPrivileges(PrivilegeBag privilegeBag)
            throws TException
    {
        return client.grant_privileges(privilegeBag);
    }

    
    public boolean revokePrivileges(PrivilegeBag privilegeBag)
            throws TException
    {
        return client.revoke_privileges(privilegeBag);
    }

    
    public void grantRole(String role, String granteeName, PrincipalType granteeType, String grantorName, PrincipalType grantorType, boolean grantOption)
            throws TException
    {
        List<RolePrincipalGrant> grants = listRoleGrants(granteeName, granteeType);
        for (RolePrincipalGrant grant : grants) {
            if (grant.getRoleName().equals(role)) {
                if (grant.isGrantOption() == grantOption) {
                    return;
                }
                if (!grant.isGrantOption() && grantOption) {
                    revokeRole(role, granteeName, granteeType, false);
                    break;
                }
            }
        }
        createGrant(role, granteeName, granteeType, grantorName, grantorType, grantOption);
    }

    private void createGrant(String role, String granteeName, PrincipalType granteeType, String grantorName, PrincipalType grantorType, boolean grantOption)
            throws TException
    {
        GrantRevokeRoleRequest request = new GrantRevokeRoleRequest();
        request.setRequestType(GrantRevokeType.GRANT);
        request.setRoleName(role);
        request.setPrincipalName(granteeName);
        request.setPrincipalType(granteeType);
        request.setGrantor(grantorName);
        request.setGrantorType(grantorType);
        request.setGrantOption(grantOption);
        GrantRevokeRoleResponse response = client.grant_revoke_role(request);
        if (!response.isSetSuccess()) {
            throw new MetaException("GrantRevokeResponse missing success field");
        }
    }

    
    public void revokeRole(String role, String granteeName, PrincipalType granteeType, boolean grantOption)
            throws TException
    {
        List<RolePrincipalGrant> grants = listRoleGrants(granteeName, granteeType);
        RolePrincipalGrant currentGrant = null;
        for (RolePrincipalGrant grant : grants) {
            if (grant.getRoleName().equals(role)) {
                currentGrant = grant;
                break;
            }
        }

        if (currentGrant == null) {
            return;
        }

        if (!currentGrant.isGrantOption() && grantOption) {
            return;
        }

        removeGrant(role, granteeName, granteeType, grantOption);
    }

    private void removeGrant(String role, String granteeName, PrincipalType granteeType, boolean grantOption)
            throws TException
    {
        GrantRevokeRoleRequest request = new GrantRevokeRoleRequest();
        request.setRequestType(GrantRevokeType.REVOKE);
        request.setRoleName(role);
        request.setPrincipalName(granteeName);
        request.setPrincipalType(granteeType);
        request.setGrantOption(grantOption);
        GrantRevokeRoleResponse response = client.grant_revoke_role(request);
        if (!response.isSetSuccess()) {
            throw new MetaException("GrantRevokeResponse missing success field");
        }
    }

    
    public List<RolePrincipalGrant> listRoleGrants(String principalName, PrincipalType principalType)
            throws TException
    {
        GetRoleGrantsForPrincipalRequest request = new GetRoleGrantsForPrincipalRequest(principalName, principalType);
        GetRoleGrantsForPrincipalResponse resp = client.get_role_grants_for_principal(request);
        return ImmutableList.copyOf(resp.getPrincipalGrants());
    }

    
    public void setUGI(String userName)
            throws TException
    {
        client.set_ugi(userName, new ArrayList<>());
    }
}
