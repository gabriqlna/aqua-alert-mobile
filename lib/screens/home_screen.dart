import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../providers/data_provider.dart';
import '../models/neighborhood_model.dart';

class HomeScreen extends StatefulWidget {
  final Function(int) onTabChanged;

  const HomeScreen({super.key, required this.onTabChanged});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    // Load initial data
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<DataProvider>().loadData();
    });
  }

  Color _getStatusColor(WaterStatus status) {
    switch (status) {
      case WaterStatus.available:
        return Colors.green;
      case WaterStatus.unavailable:
        return Colors.red;
      case WaterStatus.maintenance:
        return Colors.orange;
    }
  }

  Color _getStatusBgColor(WaterStatus status) {
    switch (status) {
      case WaterStatus.available:
        return Colors.green.shade50;
      case WaterStatus.unavailable:
        return Colors.red.shade50;
      case WaterStatus.maintenance:
        return Colors.orange.shade50;
    }
  }

  String _getAlertTime(DateTime dateTime) {
    final now = DateTime.now();
    final difference = now.difference(dateTime);

    if (difference.inMinutes < 1) return 'agora';
    if (difference.inMinutes < 60) return '${difference.inMinutes}min';
    if (difference.inHours < 24) return '${difference.inHours}h';
    return DateFormat('dd/MM').format(dateTime);
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<DataProvider>(
      builder: (context, provider, child) {
        if (provider.isLoading) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }

        if (provider.error != null) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.error_outline, size: 64, color: Colors.grey),
                const SizedBox(height: 16),
                Text('Erro ao carregar dados',
                    style: Theme.of(context).textTheme.titleLarge),
                const SizedBox(height: 8),
                Text(provider.error!, 
                    style: Theme.of(context).textTheme.bodyMedium,
                    textAlign: TextAlign.center),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: provider.loadData,
                  child: const Text('Tentar novamente'),
                ),
              ],
            ),
          );
        }

        final overallStatus = provider.overallStatus;

        return RefreshIndicator(
          onRefresh: provider.loadData,
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Status Overview Card
                Card(
                  color: _getStatusBgColor(overallStatus),
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(
                              Icons.water_drop,
                              color: _getStatusColor(overallStatus),
                              size: 32,
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Status da água',
                                    style: Theme.of(context).textTheme.titleMedium,
                                  ),
                                  Text(
                                    Neighborhood.getStatusText(overallStatus),
                                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                      color: _getStatusColor(overallStatus),
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Última atualização: agora',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                        const SizedBox(height: 12),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton.icon(
                            onPressed: () => widget.onTabChanged(1),
                            icon: const Icon(Icons.map),
                            label: const Text('Ver mapa'),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // Quick Actions
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Ações rápidas',
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const SizedBox(height: 12),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton.icon(
                            onPressed: () => widget.onTabChanged(2),
                            icon: const Icon(Icons.report_problem),
                            label: const Text('Denunciar falta d\'água'),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.red,
                              foregroundColor: Colors.white,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // Recent Alerts
                Card(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Text(
                          'Últimos alertas',
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                      ),
                      if (provider.alerts.isEmpty)
                        const Padding(
                          padding: EdgeInsets.all(16),
                          child: Text(
                            'Nenhum alerta recente',
                            style: TextStyle(color: Colors.grey),
                          ),
                        )
                      else
                        ...provider.alerts.take(5).map((alert) => ListTile(
                              leading: CircleAvatar(
                                backgroundColor: alert.type == 'emergency' 
                                    ? Colors.red
                                    : Colors.blue,
                                radius: 6,
                              ),
                              title: Text(
                                alert.message,
                                style: const TextStyle(fontSize: 14),
                              ),
                              subtitle: Text(
                                _getAlertTime(alert.createdAt),
                                style: const TextStyle(fontSize: 12),
                              ),
                            )),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}