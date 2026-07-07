# EAFC 26 Player Analytics - API Documentation

The backend service runs by default on `http://localhost:5000`.

---

## 🔒 Authentication APIs

### **1. User Registration**
* **Method & Path:** `POST /auth/register`
* **Request Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@test.com",
    "password": "Password123",
    "role": "user" // optional, defaults to "user", can be "admin"
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "name": "User Name",
        "email": "user@test.com",
        "role": "user",
        "_id": "6a4b7d0f43d93618903d6dcc"
      },
      "token": "eyJhbGciOiJI..."
    }
  }
  ```

### **2. User Login**
* **Method & Path:** `POST /auth/login`
* **Request Body:**
  ```json
  {
    "email": "user@test.com",
    "password": "Password123"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "data": {
      "user": {
        "name": "User Name",
        "email": "user@test.com",
        "role": "user",
        "_id": "6a4b7d0f43d93618903d6dcc"
      },
      "token": "eyJhbGciOiJI..."
    }
  }
  ```

---

## ⚽ Player APIs

### **1. Get All Players (Query & Filter)**
* **Method & Path:** `GET /players`
* **Query Parameters:**
  * Pagination: `?page=1&limit=10`
  * Sorting: `?sort=-ovr` (descending overall rating) or `?sort=rank` (ascending rank)
  * String filters: `?team=Real Madrid`, `?league=LaLiga`, `?nation=Spain`, `?position=CM`
  * Boundary Ranges: `?minPace=85&maxPace=99&minOvr=80`
  * Array Containment: `?playstyle=Finesse`, `?alternativePosition=RW`
  * Multi-Field Text Search: `?q=Salah`

### **2. Search Players**
* **Method & Path:** `GET /search/players?q=<keyword>`
* **Description:** Search name, team, league, nation, position, or playStyles. Also parses semantic filters like `"left foot"`, `"young"`, and `"veteran"`.

### **3. Predefined Analytics Presets**
* **Method & Path:** `GET /players/filter/:filterType`
* **Filter Types:**
  * `high-rated` (OVR >= 85)
  * `low-rated` (OVR < 75)
  * `high-pace` (Pace >= 85)
  * `high-shooters` (Shooting >= 85)
  * `youngsters` (Age <= 21 && OVR >= 75)
  * `veterans` (Age >= 32)
  * `left-footed` (Preferred Foot is Left)
  * `five-star-skillers` (Skill Moves == 5)
  * `top-playmakers` (Passing >= 85 && Vision >= 85)

### **4. Player Mutation (Write Operations - Protected)**
* **Header Required:** `Authorization: Bearer <Admin Token>`
* **Endpoints:**
  * `POST /players` (Create)
  * `PATCH /players/:id` (Update)
  * `DELETE /players/:id` (Delete)

---

## 📈 Aggregation Analytics

* **Header Required:** `Authorization: Bearer <Admin Token>`
* **Endpoints:**
  * `GET /analytics/players/top-rated?limit=10`
  * `GET /analytics/players/top-scorers?limit=10`
  * `GET /analytics/players/top-passers?limit=10`
  * `GET /analytics/players/top-dribblers?limit=10`
  * `GET /analytics/players/top-defenders?limit=10`
  * `GET /analytics/players/top-teams?limit=10` (Grouped team statistics)
  * `GET /analytics/players/top-leagues?limit=10` (Grouped league statistics)
  * `GET /analytics/players/top-nations?limit=10` (Grouped nation statistics)
  * `GET /analytics/players/position-distribution` (Total count per position)

---

## 📊 Database Statistics

* **Endpoints:**
  * `GET /stats/players/count` (Get total count of player documents)
  * `GET /stats/players/average-rating` (Get overall database rating average)

---

## 👑 Admin Features

* **Header Required:** `Authorization: Bearer <Admin Token>`
* **Method & Path:** `GET /admin/dashboard`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Admin dashboard stats retrieved successfully",
    "data": {
      "players": {
        "total": 7908,
        "averageRating": 71.72,
        "maxRating": 91
      },
      "users": {
        "total": 4,
        "adminCount": 2,
        "userCount": 2
      }
    }
  }
  ```
