import { useNotificationStore } from "../../store/useNotificationStore";

export const NotificationContainer = () => {
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`px-4 py-2 rounded shadow-lg text-white transform transition-all animate-bounce-in pointer-events-auto ${
            n.type === 'success' ? 'bg-green-500' : 
            n.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};