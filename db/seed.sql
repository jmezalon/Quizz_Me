DROP DATABASE IF EXISTS quizzme;
CREATE DATABASE quizzme;

\c quizzme;

CREATE TABLE topics (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL
);
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  topic_id INT REFERENCES topics(id) NOT NULL,
  num_of_quest INT NOT NULL
);
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  quiz_id INT REFERENCES quizzes(id) NOT NULL,
  difficulty_level VARCHAR,
  quest_input VARCHAR NOT NULL,
  quest_type VARCHAR,
  decoy_amount INT
);
CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INT REFERENCES questions(id) NOT NULL,
  correct_ans VARCHAR NOT NULL
);

CREATE TABLE decoys (
  id SERIAL PRIMARY KEY,
  question_id INT REFERENCES questions(id) NOT NULL,
  decoy_ans VARCHAR NOT NULL
);

-- CREATE TABLE grades (
--   id SERIAL PRIMARY KEY,
--   possible_points INT NOT NULL,
--   quiz_id INT REFERENCES quizzes(id) NOT NULL,
--   current_score INT NOT NULL
-- );

INSERT INTO topics (name) VALUES ('Love'), ('Anger'), ('Forgiveness'), ('Salvation');

INSERT INTO quizzes (title, topic_id, num_of_quest) VALUES
('Love Overview', 1, 2),
('You Are Forgiving', 3, 2),
('Angry Without Sinning', 2, 1),
('Am I Saved', 4, 5);

INSERT INTO questions (quiz_id, quest_input, quest_type, decoy_amount) VALUES
(1, 'Love covers a multitude of what?', 'choices', 3),
(1, 'Who is love according to the bible?', 'choices', 3),
(2, 'how many time should we forgive?', 'choices', 4);

INSERT INTO questions (quiz_id, quest_input, quest_type) VALUES
(2, 'forgiviness is a responsibility', 'true or false'),
(4, 'Jesus is the only way to God', 'True or false');

INSERT INTO questions (quiz_id, quest_input, quest_type) VALUES
(3, 'be angry but do not... ?', 'fill in');

INSERT INTO questions (quiz_id, quest_input, quest_type, decoy_amount) VALUES
(4, 'what is the fameous verse John3:16 about?', 'choices', 3),
(4, 'How does one get saved?', 'choices', 4),
(4, 'what verse says only Jesus saves?', 'choices', 3),
(4, 'when does salvation began?', 'choices', 2);


INSERT INTO answers (question_id, correct_ans) VALUES (1, 'Sin'), (2, 'Jesus'), (3, 'all the time'), (4, 'True'), (5, 'True'), (6, 'Sin'), (7, 'Salvation'), (8, 'accept Jesus'),  (9, 'John 14:6'), (10, 'Now');

INSERT INTO decoys (question_id, decoy_ans) VALUES (1, 'care'), (1, 'joy'), (1, 'anger');

INSERT INTO decoys (question_id, decoy_ans) VALUES (2, 'John'), (2, 'Mary'), (2, 'Judah');

INSERT INTO decoys (question_id, decoy_ans) VALUES (3, 'none'), (3, 'seven times 7'), (3, '3 times'), (3, 'when I feel like it');

INSERT INTO decoys (question_id, decoy_ans) VALUES (7, 'sin'), (7, 'heaven'), (7, 'food');

INSERT INTO decoys (question_id, decoy_ans) VALUES (8, 'Budah'), (8, 'deeds'), (8, 'Allah'), (8, 'no one can be saved');

INSERT INTO decoys (question_id, decoy_ans) VALUES (9, 'Matthew 3:10'), (9, 'Romans 1:5'), (9, 'Joshua 1:8');

INSERT INTO decoys (question_id, decoy_ans) VALUES (10, 'Tomorrow'), (10, 'in heaven');
