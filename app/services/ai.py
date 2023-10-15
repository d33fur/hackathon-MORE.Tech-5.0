import torch
import torch.nn as nn
from transformers import AutoModel, BertTokenizer
import numpy as np
import os


bert = AutoModel.from_pretrained('DeepPavlov/rubert-base-cased-sentence')

tokenizer = BertTokenizer.from_pretrained('DeepPavlov/rubert-base-cased-sentence')


class BERT_Arch(nn.Module):
    def __init__(self, bert, services_count):
        super(BERT_Arch, self).__init__()
        self.bert = bert
        self.dropout = nn.Dropout(0.1)
        self.relu = nn.ReLU()
        self.fc1 = nn.Linear(768,512)
        self.fc2 = nn.Linear(512,services_count)
        self.softmax = nn.LogSoftmax(dim = 1)
    
    def forward(self, sent_id, mask):
        _, cls_hs = self.bert(sent_id, attention_mask = mask, return_dict = False)
        x = self.fc1(cls_hs)
        x = self.relu(x)
        x = self.dropout(x)
        x = self.fc2(x)
        x = self.softmax(x)
        return x

class BERT_search():
    def __init__(self, weights_paths):
        self.services = {0: 'Справка о наличии счетов', 1: 'Справка о доступном остатке по счету', 2: 'Справка о доступном остатке по карте', 3: 'Справка об оборотах по счетам и остаткам', 4: 'Справка об оборотах по картам и остатках', 5: 'Справка об уплаченных процентах', 6: 'Справка о закрытии кредита', 7: 'Справка о наличии ссудной задолженности', 8: 'Справка об общей задолженности', 9: 'Сведения для госслужащих', 10: 'Налоговый вычет по ИИС', 11: 'Антиклещ', 12: 'ОСАГО с кешбэком 10%', 13: 'КАСКО Лайт', 14: 'Спортзащита', 15: 'Страхование жилья', 16: 'Страхование от критических заболеваний', 17: 'Страхование от мошенничества', 18: 'Страхование кредитной карты', 19: 'Защити детей', 20: 'Детское страхование от критических заболеваний', 21: 'Кадровый советник', 22: 'Защити жилье', 23: 'Юридическая помощь', 24: 'Налогия', 25: 'Спроси доктора', 26: 'Мужское и женское здоровье', 27: 'Спутник здоровья', 28: 'Мультисервис', 29: 'Защита телефона', 30: 'Новое поколение', 31: 'Мое здоровье', 32: 'Накопительное страхование жизни', 33: 'Инвестиционное страхование жизни', 34: 'Финансовый резерв', 35: 'Экспресс-проект', 36: 'Защита сделки', 37: 'Кредитный помощник', 38: 'Регистрация на Госуслугах', 39: 'Оплачивайте налоги', 40: 'Материнский капитал', 41: 'Пенсия', 42: 'Детские пособия', 43: 'Аресты и взыскания', 44: 'Кредитная история', 45: 'Налоговый вычет', 46: 'Банковские услуги для лиц с инвалидностью', 47: 'Единый счет для социальных выплат', 48: 'Инвестиционные услуги', 49: 'Сопровождение ипотечных и автокредитов', 50: 'Аренда сейфовых ячеек', 51: 'Дополнительная пенсия в НПФ ВТБ', 52: 'Надежное хранение документов и ценностей', 53: 'Аккредитивы', 54: 'Кредит под залог имеющейся недвижимости', 55: 'Банкротство физлиц', 56: 'Наследство', 57: 'Живи уверенно'}
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = BERT_Arch(bert, len(self.services))
        print(os.listdir())
        self.model.load_state_dict(torch.load(weights_paths))
        self.model.to(self.device)

    def predict(self, query):
        tokens = tokenizer.batch_encode_plus(
            [query],
            max_length = 50,
            padding = 'max_length',
            truncation = True
        )
        seq = torch.tensor(tokens['input_ids'])
        mask = torch.tensor(tokens['attention_mask'])
        self.model.eval()
        with torch.no_grad():
            preds = self.model(seq.to(self.device), mask.to(self.device)).detach().cpu().numpy()
        
        #print(flat_preds, 'asdasdas\n\n\nn\n', preds)
        
        preds = ((preds - np.min(preds)) / (np.max(preds) - np.min(preds)))[0]  
        keys = sorted(list(self.services.keys()), key=lambda x: preds[x], reverse=True)
        return list(map(lambda x: self.services[x], keys))