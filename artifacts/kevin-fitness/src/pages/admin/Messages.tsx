import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Mail, CheckCircle2 } from "lucide-react";

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id: number, readStatus: boolean) => {
    await supabase.from("messages").update({ read: readStatus }).eq("id", id);
    fetchMessages();
  };

  const deleteMessage = async (id: number) => {
    if (confirm("Delete this message?")) {
      await supabase.from("messages").delete().eq("id", id);
      fetchMessages();
    }
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground font-mono">Loading messages...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="font-display text-4xl text-foreground flex items-center">
          Messages Inbox
          {messages.filter(m => !m.read).length > 0 && (
            <span className="ml-4 bg-primary text-background font-mono text-sm px-2 py-0.5 rounded-none">
              {messages.filter(m => !m.read).length} New
            </span>
          )}
        </h1>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground border border-border bg-card font-mono">
            No messages yet.
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`bg-card border p-6 ${!msg.read ? 'border-primary shadow-[0_0_10px_rgba(232,197,71,0.1)]' : 'border-border opacity-70'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!msg.read ? 'bg-primary text-background' : 'bg-border text-muted-foreground'}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg">{msg.name}</h3>
                    <p className="font-mono text-sm text-muted-foreground">{msg.email}</p>
                  </div>
                </div>
                <div className="font-mono text-xs text-muted-foreground">
                  {new Date(msg.created_at).toLocaleDateString()}
                </div>
              </div>
              
              <div className="bg-[#0a0a0a] p-4 text-sm text-foreground/90 font-sans leading-relaxed mb-4 border-l-2 border-border">
                {msg.message}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  onClick={() => markRead(msg.id, !msg.read)} 
                  className={`ghost-gold-btn px-4 py-2 font-sans text-xs tracking-normal flex items-center ${msg.read ? 'border-border text-muted-foreground hover:text-primary hover:border-primary' : ''}`}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" /> 
                  {msg.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button 
                  onClick={() => deleteMessage(msg.id)} 
                  className="px-4 py-2 border border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors font-sans text-xs flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
