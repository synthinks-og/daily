
# 🌟 Daily Airdrop Manager

## ✨ Features

- 📅 **Manage Daily Check-ins**: Track and manage your daily airdrop check-ins efficiently.
- 📝 **Airdrop Task Management**: Add, edit, and delete your airdrop tasks with ease.
- ⏳ **Time-Saving**: Organize your tasks quickly with a streamlined interface.
- 🧭 **Task Tracking**: Keep track of ongoing airdrops across different platforms.
- 💻 **User-Friendly Interface**: Simple and intuitive UI, designed for a smooth experience.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Pip** (v24.2 or higher)
- **Flask** (v3.0.3 or higher)
- **SQLite3** (v3.46.1 or higher)
- **Python3** (v3.12.7 or higher)

## 🚀 Getting Started

Follow these steps to set up the Daily Airdrop Manager:

1. **Clone the repository**

   ```bash
   git clone https://github.com/synthinks-og/daily.git
   cd daily
   
2. **Initialize the Database**

   Run the following command to set up the SQLite3 database:

   ```bash
   python3 database.py
   
3. **Run the Application**

   Start the Daily Airdrop Manager:

   ```bash
   python3 app.py

4. **Open the Browser**

   Access the application by opening this address in your browser:

   ```bash
   http://localhost:5000
   
6. **Start Managing Tasks!**

   You can now start managing your daily airdrop tasks and track your progress.

## ⚠️ Important Notes

- **Database Initialization**: Run `database.py` before starting the application to ensure the database is properly set up.
- **Categories Support**: The current version supports managing tasks for categories such as `Telegram`, `Social`, `Retro`, and `Testnet`.
- **Data Management**: When adding airdrop tasks, ensure to include proper task details like name, description, and links to maintain consistency.
- **Backup**: Regularly back up your `airdrop.db` file to avoid data loss.

## 🤝 Contributing

Contributions are always welcome! Whether it's bug fixes, new features, or documentation improvements, feel free to fork this repository and submit your pull requests.

## 📜 License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.

## 🙏 Acknowledgements

- Thanks to the open-source community for providing useful libraries and tools.
- Special gratitude to contributors who have helped improve this project through feedback and testing.

---

Enjoy using the **Daily Airdrop Manager**! If you have any questions or encounter any issues, please don't hesitate to open an issue on GitHub. Happy tracking and good luck with your airdrops!
