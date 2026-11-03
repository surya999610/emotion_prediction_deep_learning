# 🎭 Emotion Prediction Using NLP and Deep Learning

An end-to-end Natural Language Processing (NLP) and Deep Learning project that predicts human emotions from text using Recurrent Neural Networks (RNN), LSTM, GRU, and Bidirectional GRU (BiGRU). The project processes textual data, learns contextual patterns, and provides emotion predictions through a deployed web application.

<p align="center">
  <a href="https://emotion-prediction-deep-learning.onrender.com/">
    🚀 <strong>Live Demo</strong>
  </a>
  &nbsp; | &nbsp;
  <a href="https://github.com/surya999610/emotion_prediction_deep_learning">
    📂 <strong>GitHub Repository</strong>
  </a>
</p>

---

## 📌 Project Overview

Human emotions are often expressed through written language. Natural Language Processing helps computers understand and interpret these expressions.

This project uses NLP techniques and Deep Learning architectures to analyze text and predict the emotion associated with it.

The project explores different recurrent neural network architectures, including Simple RNN, LSTM, GRU, and Bidirectional GRU. These models are trained and evaluated to understand how different architectures perform on sequential text classification.

The final stage incorporates Bidirectional GRU (BiGRU) to process text in both forward and backward directions, allowing the model to learn contextual information from both sides of a sequence.

The trained model is connected to a web application where users can enter text and receive emotion predictions.

## 🎯 Project Objectives

- Understand the fundamentals of Natural Language Processing.
- Perform text preprocessing and cleaning.
- Convert textual data into numerical sequences using tokenization.
- Apply padding to make input sequences consistent.
- Understand and implement recurrent neural network architectures.
- Experiment with RNN, LSTM, GRU, and Bidirectional GRU.
- Compare model performance using test loss and accuracy.
- Develop a web application for emotion prediction.
- Deploy the application for online access.

## 🛠️ Technologies and Tools

| Category | Technologies |
|---|---|
| Programming Language | Python |
| Deep Learning | TensorFlow, Keras |
| NLP | Tokenization, Text Preprocessing, Sequence Padding |
| Neural Network Models | RNN, LSTM, GRU, BiGRU |
| Data Processing | Pandas, NumPy |
| Model Evaluation | Loss, Accuracy |
| Development Environment | Jupyter Notebook, VS Code |
| Version Control | Git, GitHub |
| Deployment | Render |

## 🔄 Project Workflow

The project follows these major steps:

1. **Data Preparation:** Load and prepare the text dataset.
2. **Text Cleaning:** Clean and normalize textual data.
3. **Tokenization:** Convert words into numerical tokens.
4. **Sequence Conversion:** Transform sentences into sequences of integers.
5. **Padding:** Make all input sequences the same length.
6. **Model Building:** Create different recurrent neural network architectures.
7. **Model Training:** Train the models using the prepared text sequences.
8. **Model Evaluation:** Compare model performance using test loss and accuracy.
9. **Final Architecture:** Incorporate Bidirectional GRU for contextual text processing.
10. **Deployment:** Connect the trained model to a web application.

## 🧹 NLP Text Preprocessing

Text preprocessing is an important step because neural networks cannot directly understand raw textual data.

The project uses NLP preprocessing techniques to convert text into a format suitable for Deep Learning models.

### Preprocessing Steps

- Text cleaning and normalization.
- Tokenization to convert words into numerical values.
- Sequence generation to represent sentences numerically.
- Padding to maintain a fixed input sequence length.

### Example

**Input Text:**

```text
I am feeling very happy today.
```

**After Tokenization:**

```python
[12, 45, 78, 23, 91, 5]
```

*Illustrative token IDs; actual values depend on the trained tokenizer.*

**After Padding:**

```python
[12, 45, 78, 23, 91, 5, 0, 0, 0, 0]
```

The resulting sequences are provided as input to the Deep Learning models.

## 🧠 Deep Learning Models

This project explores four recurrent neural network architectures for text-based emotion classification.

### 1. Simple RNN (Recurrent Neural Network)

A Simple RNN processes sequential data one step at a time and maintains information from previous time steps using a hidden state.

It helps the model learn basic sequential patterns in text.

### 2. LSTM (Long Short-Term Memory)

LSTM is an advanced type of RNN designed to capture long-term dependencies.

It uses three main gates:

- Forget Gate
- Input Gate
- Output Gate

These gates help the model decide which information to remember, update, and output.

### 3. GRU (Gated Recurrent Unit)

GRU is another advanced RNN architecture that uses two main gates:

- Update Gate
- Reset Gate

It provides a simpler gating mechanism than LSTM while learning important patterns in sequential data.

### 4. Bidirectional GRU (BiGRU)

Bidirectional GRU is the final architecture incorporated into this project.

Unlike a standard GRU, BiGRU processes the input sequence in two directions:

- **Forward Direction:** Reads the text from beginning to end.
- **Backward Direction:** Reads the text from end to beginning.

By combining information from both directions, BiGRU can understand the context of words using information from both preceding and following words.

This is useful in emotion prediction because the meaning of a sentence can depend on the complete context.

## 📊 Model Performance Comparison

The following are the previously recorded evaluation results for the first three model experiments.

| Model | Test Loss | Test Accuracy |
|---|---:|---:|
| GRU | 1.782533 | 29.00% |
| Simple RNN | 1.764246 | 28.95% |
| LSTM | 1.755500 | 24.65% |
| Bidirectional GRU | 0.196181 | 92.29% |

### Observations

- GRU achieved the highest test accuracy among the first three recorded experiments.
- Simple RNN achieved nearly the same accuracy as GRU.
- LSTM recorded the lowest test loss among these three experiments.
- Bidirectional GRU is incorporated as the final architecture to capture contextual information in both directions.

*Note: The final BiGRU result should be added after evaluating the trained model on the held-out test dataset.*

## 🌐 Live Application

The project is deployed on Render and can be accessed online.

**[🚀 Open Emotion Prediction Application](https://emotion-prediction-deep-learning.onrender.com/)**

Users can access the application and try its emotion prediction functionality using text input.

## 💻 Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/surya999610/emotion_prediction_deep_learning.git
```

### 2. Navigate to the Project Directory

```bash
cd emotion_prediction_deep_learning
```

### 3. Create a Virtual Environment

```bash
py -m venv .venv
```

### 4. Activate the Virtual Environment

For Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

For Linux/macOS:

```bash
source .venv/bin/activate
```

### 5. Install Dependencies


```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 6. Run the Application

Run the application using the entry-point command configured in the project.

## 📚 Key Learnings

Through this project, I gained practical experience in:

- Natural Language Processing and text classification.
- Text cleaning, tokenization, and sequence padding.
- Understanding sequential data.
- Implementing Simple RNN, LSTM, and GRU architectures.
- Understanding Bidirectional GRU.
- Building and training Deep Learning models.
- Evaluating and comparing neural network performance.
- Integrating a trained model into a web application.
- Deploying a Deep Learning project online.

## 🚀 Future Improvements

- Improve prediction accuracy through hyperparameter tuning.
- Experiment with different embedding techniques.
- Perform detailed model evaluation using precision, recall, and F1-score.
- Explore Bidirectional LSTM and Transformer architectures.
- Improve the user interface and prediction experience.
- Extend the project to support additional emotion categories.

## 👨‍💻 Author

**Surya Gautam**

- GitHub: [surya999610](https://github.com/surya999610)
- LinkedIn: [Surya Gautam](https://www.linkedin.com/in/surya-gautam-03bba6286/)

---

⭐ If you find this project interesting, consider giving the repository a star!
