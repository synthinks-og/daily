from flask import Flask, render_template, request, jsonify
import sqlite3
from database import init_db, insert_airdrop, get_airdrops, delete_airdrop, update_calendar_date

app = Flask(__name__)

init_db()

@app.route('/')
def index():
    projects = get_airdrops(category='telegram')  
    return render_template('index.html', projects=projects)

@app.route('/social') 
def social_view():
    projects = get_airdrops(category='social')
    return render_template('social.html', projects=projects)
    
@app.route('/retro') 
def retro_view():
    projects = get_airdrops(category='retro')
    return render_template('retro.html', projects=projects)
    
@app.route('/testnet') 
def testnet_view():
    projects = get_airdrops(category='testnet')
    return render_template('testnet.html', projects=projects)

@app.route('/telegram')  
def telegram():
    projects = get_airdrops(category='telegram')
    return render_template('index.html', projects=projects)

@app.route('/add_airdrop', methods=['POST'])
def add_airdrop():
    data = request.get_json()
    name = data.get('name')
    link1 = data.get('link1')
    link2 = data.get('link2')
    description = data.get('description')
    categories = ', '.join(data.get('categories', []))

    insert_airdrop(name, link1, link2, description, categories)
    
    return jsonify({'message': 'Airdrop added successfully'})

@app.route('/delete_airdrop', methods=['POST'])
def delete_airdrop_route():
    data = request.get_json()
    airdrop_id = data.get('airdrop')

    delete_airdrop(airdrop_id)

    return jsonify({'message': 'Airdrop deleted successfully'})

@app.route('/update_calendar', methods=['POST'])
def update_calendar():
    data = request.get_json()
    project_id = data.get('projectId')
    date = data.get('date')

    update_calendar_date(project_id, date)

    return jsonify({'message': 'Calendar date updated successfully'})

if __name__ == '__main__':
    app.run(debug=True)