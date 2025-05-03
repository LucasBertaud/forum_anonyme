function messageForm() {
  return {
    notifyShow: true,
    async submit() {
      this.notifyShow = true;
      try {
        const response = await fetch("http://localhost:3000/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: this.message,
            author: this.pseudo,
          }),
        });

        if (!response.ok) throw new Error("Erreur API");

        this.notif = {
          text: "Message envoyé avec succès !",
          type: "success",
        };
        this.message = "";
      } catch (error) {
        this.notif = {
          text: "Échec de l’envoi du message.",
          type: "error",
        };
      }

      setTimeout(() => (this.notifyShow = false), 3000);
      setTimeout(() => (this.notif = null), 3500);
    },
  };
}
