import sqlite3

DB_NAME = 'airdrop.db'

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS airdrop (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            link1 TEXT NOT NULL,
            link2 TEXT,
            description TEXT,
            categories TEXT,
            last_checked_date TEXT  -- Tambahkan koma di akhir baris ini
        )
    ''')
    conn.commit()
    conn.close()

def insert_airdrop(name, link1, link2, description, categories):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO airdrop (name, link1, link2, description, categories)
        VALUES (?, ?, ?, ?, ?)
    ''', (name, link1, link2, description, categories))
    conn.commit()
    conn.close()

def get_airdrops(category=None):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    if category:
        cursor.execute('SELECT * FROM airdrop WHERE categories LIKE ?', ('%' + category + '%',))
    else:
        cursor.execute('SELECT * FROM airdrop')
    
    rows = cursor.fetchall()
    conn.close()
    return rows

def delete_airdrop(airdrop_id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM airdrop WHERE id = ?', (airdrop_id,))
    conn.commit()
    conn.close()

def update_calendar_date(project_id, date):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE airdrop
        SET last_checked_date = ?
        WHERE id = ?
    ''', (date, project_id))
    conn.commit()
    conn.close()