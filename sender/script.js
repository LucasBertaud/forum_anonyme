function messageForm() {
  return {
    async submit() {
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

      setTimeout(() => (this.notif = null), 3000);
    },
  };
}

function pseudoForm() {
  return {
    async submit() {
      try {
        const response = await fetch("http://localhost:3000/active-pseudo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo: this.pseudo,
          }),
        });

        if (!response.ok) {
          console.log(response);
          if (response.status === 409) {
            throw new Error("Ce pseudo est déjà utilisé.");
          }
          throw new Error("Erreur lors de l'enregistrement du pseudo");
        }

        this.step = "message"; // Passe à l'étape suivante si le pseudo est enregistré avec succès
      } catch (error) {
        this.notif = {
          text: error.message,
          type: "error",
        };
        setTimeout(() => (this.notif = null), 3000);
      }
    },
  };
}
