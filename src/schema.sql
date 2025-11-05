
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('reviewer', 'submitter')) DEFAULT 'submitter',
    display_picture TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_by INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE project_members (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) CHECK (role IN ('reviewer', 'submitter')) DEFAULT 'submitter',
    UNIQUE (project_id, user_id)
);


CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    submitted_by INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    code TEXT NOT NULL,
    status VARCHAR(30)
        CHECK (status IN ('pending', 'in_review', 'approved', 'changes_requested'))
        DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    submission_id INT REFERENCES submissions(id) ON DELETE CASCADE,
    commented_by INT REFERENCES users(id) ON DELETE CASCADE,
    line_number INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    submission_id INT REFERENCES submissions(id) ON DELETE CASCADE,
    reviewed_by INT REFERENCES users(id) ON DELETE CASCADE,
    decision VARCHAR(30) CHECK (decision IN ('approved', 'changes_requested')),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (name, email, password_hash, role)
VALUES
('Alice Reviewer', 'alice@example.com', 'hashed_password_1', 'reviewer'),
('Bob Submitter', 'bob@example.com', 'hashed_password_2', 'submitter');

INSERT INTO projects (name, description, created_by)
VALUES
('API Collaboration Platform', 'Internal code review system', 1);

INSERT INTO project_members (project_id, user_id, role)
VALUES
(1, 1, 'reviewer'),
(1, 2, 'submitter');

INSERT INTO submissions (project_id, submitted_by, title, code)
VALUES
(1, 2, 'Initial API Endpoint', 'console.log("Hello Code Review!");');

INSERT INTO comments (submission_id, commented_by, line_number, content)
VALUES
(1, 1, 1, 'Consider adding input validation.');

INSERT INTO reviews (submission_id, reviewed_by, decision, remarks)
VALUES
(1, 1, 'changes_requested', 'Needs better error handling.');

INSERT INTO notifications (user_id, message)
VALUES
(2, 'Your submission received a comment from Alice Reviewer.');



